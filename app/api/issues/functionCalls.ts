import axios from "axios";
import { string } from "zod";

interface CreateIssueProps {
  title: string;
  description: string;
}
export async function createIssue(data: CreateIssueProps):Promise<void> {
  try {
    await axios.post("/api/issues", data);
  } catch (error) {
    throw error;
  }
}
