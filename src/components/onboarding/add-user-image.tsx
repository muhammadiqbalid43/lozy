import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";
import { Camera, Check, Trash, User } from "lucide-react";
import React, { useMemo, useRef, useState } from "react";
import UserAvatar from "../ui/user-avatar";
import { useForm } from "react-hook-form";
import { ImageSchema, imageSchema } from "@/schema/image-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";

interface Props {
  profileImage?: string | null;
}

export default function AddUserImage({ profileImage }: Props) {
  const [imagePreview, setImagePreview] = useState("");
  const inputRef = useRef<null | HTMLInputElement>(null);

  const form = useForm<ImageSchema>({
    resolver: zodResolver(imageSchema),
  });

  const imageOptions = useMemo(() => {
    if (!imagePreview && profileImage) {
      return {
        canDelete: true,
        canSave: false,
      };
    } else if (imagePreview && profileImage) {
      return {
        canDelete: false,
        canSave: true,
      };
    } else if (imagePreview && !profileImage) {
      return {
        canDelete: false,
        canSave: true,
      };
    } else {
      return {
        canDelete: false,
        canSave: false,
      };
    }
  }, [imagePreview, profileImage]);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const result = imageSchema.safeParse({ image: selectedFile });
      if (result.success) {
        form.clearErrors("image");
        form.setValue("image", selectedFile);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
        // console.log("File selected:", e.target.files[0]);
        // console.log(
        //   "Image preview URL:",
        //   URL.createObjectURL(e.target.files[0])
        // );
      } else {
        const errors = result.error.flatten().fieldErrors.image;
        errors?.forEach((error) => form.setError("image", { message: error }));
      }
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-2">
      {/* <p className="text-sm text-muted-foreground">Add a photo</p> */}
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            {profileImage ? (
              <Image
                priority
                src={profileImage}
                alt=""
                fill
                className="object-cover w-full h-full"
              />
            ) : (
              <User />
            )}
            <div className="group-hover:opacity-80 transition-opacity duration-200 opacity-0 w-full h-full absolute bg-black flex justify-center items-center flex-col gap-1 text-xs text-white">
              <Camera size={20} />
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col items-center justify-center sm:max-w-[28rem] p-0">
          <DialogHeader className="items-center justify-center">
            <DialogTitle>Upload a photo</DialogTitle>
            <DialogDescription>
              Choose an image to upload as your profile picture.
            </DialogDescription>
          </DialogHeader>
          {imagePreview ? (
            <div className="rounded-full w-32 h-32 sm:w-52 sm:h-52 relative overflow-hidden my-5">
              <Image
                src={imagePreview}
                alt=""
                fill
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <UserAvatar
              className="w-32 h-32 sm:w-52 sm:h-52 my-5"
              size={52}
              profileImage={profileImage}
            />
          )}

          <Form {...form}>
            <form>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex justify-center items-center">
                        <Button
                          onClick={() => {
                            inputRef.current?.click();
                          }}
                          type="button"
                        >
                          Choose a file
                        </Button>
                        <Input
                          {...field}
                          ref={inputRef}
                          value={undefined}
                          onChange={onImageChange}
                          type="file"
                          id="image"
                          className="hidden"
                          accept="image/*"
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex mt-5 w-full justify-center items-center gap-4">
                <Button
                  type="button"
                  disabled={!imageOptions.canDelete}
                  variant={imageOptions.canDelete ? "default" : "secondary"}
                  className={`rounded-full w-12 h-12 p-2 ${
                    imageOptions.canDelete
                      ? "text-white"
                      : "text-muted-foreground"
                  }`}
                >
                  <Trash size={18} />
                </Button>
                <Button
                  type="submit"
                  disabled={!imageOptions.canSave}
                  variant={imageOptions.canSave ? "default" : "secondary"}
                >
                  <Check size={18} />
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
