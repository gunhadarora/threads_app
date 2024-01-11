"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { usePathname, useRouter } from "next/navigation";

import { commentValidation } from "@/lib/validations/thread";
import { updateUser } from "@/lib/actions/user.actions";
import { addCommentToThread, createThread } from "@/lib/actions/thread.actions";
import Image from "next/image";

interface Props {
  threadId: string;
  currentUserId: string;
  currentUserImg: string;
}

const Comment = ({ threadId, currentUserId, currentUserImg }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(commentValidation),
    defaultValues: {
      thread: "",
    },
  });
  async function onSubmit(values: z.infer<typeof commentValidation>) {
    await addCommentToThread(threadId,values.thread,JSON.parse(currentUserId),pathname);
    form.reset()
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 flex items-center gap-4 border-y border-y-dark-4 py-5 max-xs:flex-col"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-base-semibold text-light-2">
                <Image 
                src={currentUserImg}
                alt="profile image"
                width={48}
                height={48}
                className="rounded-full object-cover"/>
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Input
                  type="text"
                  placeholder="Comment..."
                  className="no-focus text-light-1 outline-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="rounded-3xl bg-primary-500 px-8 py-2 !text-small-regular text-light-1 max-xs:w-full">
          Reply
        </Button>
      </form>
    </Form>
  );
};

export default Comment;
