"use client";

import { toast } from "sonner"
import axios from "axios";
import { z } from "zod";
import { Heading } from "@/components/Heading";
import { VideoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/Empty";
import { Loader } from "@/components/Loader";
import { useProModal } from "@/hooks/use-pro-model";
import { useTranslations } from "next-intl";

export default function VideoPage() {
  const t = useTranslations('dashboard');
  const proModal = useProModal()
  const router = useRouter();
  const [video, setVideo] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined)

      const response = await axios.post('/api/video', values)

      setVideo(response.data[0])

      form.reset()
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen()
      } else {
        toast("Algo deu errado", {
          description: "Tente novamente mais tarde",
          action: {
            label: "Fechar",
            onClick: () => {},
          },
        })
      }
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title={t('services.video')}
        description={t('descriptions.video')}
        icon={VideoIcon}
        iconColor="text-orange-700"
        bgColog="bg-orange-700/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg bourder w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder={t('prompts.video')}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                {t('button')}
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {!video && !isLoading && (
            <Empty label={t('empty.video')} />
          )}
         {video && (
          <video controls className="w-full aspect-video mt-8 rounded-lg border bg-black">
            <source src={video} />
          </video>
         )}
        </div>
      </div>
    </div>
  );
}
