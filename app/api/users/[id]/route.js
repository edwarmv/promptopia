import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  const { id: userId } = params;
  try {
    await connectToDB();
    const user = await User.findById(userId);
    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Failed to get user", { status: 500 });
  }
};
