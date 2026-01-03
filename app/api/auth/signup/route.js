import dbConnect from "../../../../lib/connectDb";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password, role, companyName, phone } = body;

    if (!name || !email || !password || !companyName || !phone) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    // Password strength: min 8, upper, lower, digit, special
    const pwOk = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!pwOk.test(password)) {
      return new Response(
        JSON.stringify({ error: "Password must be 8+ chars with upper, lower, number, and special." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    await dbConnect();

    const existing = await User.findOne({ email });
    if (existing) {
      return new Response(JSON.stringify({ error: "Email already in use" }), { status: 409, headers: { "Content-Type": "application/json" } });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    // Build loginID: (first two letters of company)(two letters of first and last name)(year)(4-digit serial)
    const clean = (s) => (s || "").replace(/[^A-Za-z]/g, "");
    const compPart = clean(companyName).toUpperCase().slice(0, 2).padEnd(2, "X");
    const parts = (name || "").trim().split(/\s+/);
    const first = clean(parts[0] || "").toUpperCase();
    const last = clean(parts[1] || "").toUpperCase();
    const namePart = `${first.slice(0, 2).padEnd(2, "X")}${last.slice(0, 2).padEnd(2, "X")}`;
    const year = new Date().getFullYear().toString();
    const startOfYear = new Date(`${year}-01-01T00:00:00.000Z`);
    const startOfNextYear = new Date(`${Number(year) + 1}-01-01T00:00:00.000Z`);
    const countThisYear = await User.countDocuments({ joinedAt: { $gte: startOfYear, $lt: startOfNextYear } });
    const serial = String(countThisYear + 1).padStart(4, "0");
    const loginID = `${compPart}${namePart}${year}${serial}`;

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role || "employee",
      companyName,
      phone,
      loginID,
    });

    return new Response(JSON.stringify({ ok: true, id: user._id, loginID }), { status: 201, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
