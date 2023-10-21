"use client";

import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createIssue } from "@/app/api/issues/functionCalls";
import { resolve } from "path";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, control, handleSubmit, formState } = useForm<IssueForm>();
  const router = useRouter();
  // const

  return (
    <form
      className="max-w-md space-y-3"
      onSubmit={handleSubmit(async (data) => {
        try {
          // await new Promise((resolve) =>
          //   setTimeout(() => {
          //     console.log("wait over!");
          //     resolve(null);
          //   }, 4000)
          // );
          await createIssue(data);
          toast.success("Issue submitted successfuly !");
          router.push("/issues");
        } catch (error) {
          toast.error(`something went wrong ! ${(error as Error).message}`);
        }
      })}
    >
      <TextField.Root>
        <TextField.Input {...register("title")} placeholder="Title" />
      </TextField.Root>
      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />
      <Button type="submit" disabled={formState.isSubmitting}>
        Submit New Issue
      </Button>
    </form>
  );
};

export default NewIssuePage;
