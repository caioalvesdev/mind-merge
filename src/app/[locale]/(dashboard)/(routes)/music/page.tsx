"use client";

import { toast } from "sonner"
import axios from "axios";
import { z } from "zod";
import { Heading } from "@/components/Heading";
import { Music } from "lucide-react";
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

export default function MusicPage() {
  const t = useTranslations('dashboard');
  const proModal = useProModal()
  const router = useRouter();
  const [music, setMusic] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined)

      const response = await axios.post('/api/music', values)

      setMusic(response.data.audio)

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
        title={t('services.music')}
        description={t('descriptions.music')}
        icon={Music}
        iconColor="text-emerald-500"
        bgColog="bg-emerald-500/10"
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
                        placeholder={t('prompts.music')}
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
          {!music && !isLoading && (
            <Empty label={t('empty.music')} />
          )}
         {music && (
          <audio controls className="w-full mt-8">
            <source src={music}></source>
          </audio>
         )}
        </div>
      </div>
    </div>
  );
}
