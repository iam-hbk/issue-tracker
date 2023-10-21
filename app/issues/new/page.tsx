"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createIssue } from "@/app/api/issues/functionCalls";
import { AxiosError } from "axios";
import { useState } from "react";
import { BiErrorCircle } from "react-icons/bi";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, control, handleSubmit, formState, reset } =
    useForm<IssueForm>();
  const [error, setError] = useState<string>();
  const router = useRouter();
  // const

  return (
    <div className="max-w-xl">
      {!!error ? (
        <Callout.Root color="red" className="mb-2 flex">
          <Callout.Icon className="self-center">
            <BiErrorCircle />
          </Callout.Icon>
          <Callout.Text className="flex border space-x-3 items-center">
            <p>{error}</p>
            <Button onClick={() => reset()}>Reset Form</Button>
          </Callout.Text>
        </Callout.Root>
      ) : null}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await createIssue(data);
            toast.success("Issue submitted successfuly !");
            router.push("/issues");
          } catch (error: unknown) {
            let error_ = error as AxiosError;
            if (error_.isAxiosError) {
              console.log(error_.response?.data);
            }
            toast.error(
              `something went wrong ! ${(error as AxiosError).message}`
            );
            setError(error_.message);
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
    </div>
  );
};

export default NewIssuePage;
