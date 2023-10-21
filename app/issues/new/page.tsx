"use client";

import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createIssue } from "@/app/api/issues/functionCalls";
import { AxiosError } from "axios";
import { useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinners from "@/app/components/Spinners";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState<string>();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createIssue(data);
      toast.success("Issue submitted successfuly !");
      router.push("/issues");
    } catch (error: unknown) {
      let error_ = error as AxiosError;
      if (error_.isAxiosError) {
        console.log(error_.response?.data);
      }
      toast.error(`something went wrong ! ${(error as AxiosError).message}`);
      setError(error_.message);
    }
  });

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
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input {...register("title")} placeholder="Title" />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button type="submit" disabled={isSubmitting}>
          Submit New Issue {isSubmitting && <Spinners />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
