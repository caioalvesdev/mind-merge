"use client";

import { toast } from "sonner"
import axios from "axios";
import { z } from "zod";
import { Heading } from "@/components/Heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import OpenAI from "openai";
import { Empty } from "@/components/Empty";
import { Loader } from "@/components/Loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/User-avatar";
import { BotAvatar } from "@/components/Bot-avatar";
import { useProModal } from "@/hooks/use-pro-model";
import { useTranslations } from "next-intl";

export default function ConversationPage() {
  const t = useTranslations('dashboard');
  const proModal = useProModal()
  const router = useRouter();
  const [messages, setMessages] = useState<OpenAI.Chat.ChatCompletionMessage[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: OpenAI.Chat.ChatCompletionMessage = {
        role: "assistant",
        content: values.prompt,
      };

      const newMessages = [...messages, userMessage]

      const response = await axios.post('/api/conversation', {
        messages: newMessages
      })

      const newResponseData: any = {
        role: 'user',
        content: response.data.content
      }

      setMessages((current) => [...current, userMessage, newResponseData])

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
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title={t('services.chat')}
        description={t('descriptions.chat')}
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColog="bg-violet-500/10"
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
                        placeholder={t('prompts.chat')}
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
          { messages.length === 0 && !isLoading && (
            <Empty label={t('empty.chat')} />
          )}
          <div className="flex flex-col-reverse gap-y-4">
              {messages.map((message) => (
                <div 
                  key={message.content}
                  className={cn(
                    'p-8 w-full flex items-center gap-x-8 rounded-lg',
                    message.role !== 'assistant' ? 'bg-muted' : 'bg-white border border-black/10'
                  )}  
                >
                  {message.role !== 'assistant' ? <BotAvatar /> : <UserAvatar />  }
                  <p className="text-sm">
                    {message.content}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

