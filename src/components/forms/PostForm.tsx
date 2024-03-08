import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import { FileUploader } from "../shared/FileUploader";
import { PostValidation } from "@/lib/validation";
import { Models } from "appwrite";

type PostFormProps = {
  post?: Models.Document
}

export const PostForm = ({ post }: PostFormProps) => {
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post? post.tags.join(',') : "",
    },
  });

  function onSubmit(values: z.infer<typeof PostValidation>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField control={form.control} name="caption" render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Título</FormLabel>
            <FormControl>
              <Textarea className="shad-textarea custom-scrollbar" {...field} />
            </FormControl>
            <FormMessage className="shad-form_message" />
          </FormItem>
        )} />

        <FormField control={form.control} name="file" render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Agregar Fotos</FormLabel>
            <FormControl>
              <FileUploader 
                fieldChange={field.onChange}
                mediaUrl={post?.imageUrl}
              />
            </FormControl>
            <FormMessage className="shad-form_message" />
          </FormItem>
        )} />

        <FormField control={form.control} name="location" render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Agregar Ubicación</FormLabel>
            <FormControl>
              <Input type="text" className="shad-input" {...field} />
            </FormControl>
            <FormMessage className="shad-form_message" />
          </FormItem>
        )} />

        <FormField control={form.control} name="tags" render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Agregar Tags (Separado por comas ",")</FormLabel>
            <FormControl>
              <Input type="text" className="shad-input" placeholder="JS, TS, React" {...field} />
            </FormControl>
            <FormMessage className="shad-form_message" />
          </FormItem>
        )} />

        <div className="flex gap-4 items-center justify-end">
          <Button type="button" className="shad-button_dark_4">Cancelar</Button>
          <Button type="submit" className="shad-button_primary whitespace-nowrap">Publicar</Button>
        </div>
      </form>
    </Form>
  );
};
