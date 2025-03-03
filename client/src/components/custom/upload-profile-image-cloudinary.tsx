import { Cloudinary } from '@cloudinary/url-gen';
import { useRef, useState } from 'react';
import { env } from '../../config/env';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { uploadImage } from '@/services/cloudinary';
import { LoaderCircle, Pencil, X } from 'lucide-react';
import { setNewChatUploadedResumeDetail } from '@/lib/store/features/conversation/consersationSlice';
import { useAppDispatch } from '@/lib/store/hooks/hooks';
import { UserProfileAvatar } from './user-profile-avatar';

export const UploadProfileImageCloudinary = () => {

  const dispatch = useAppDispatch();

  const myCld = new Cloudinary({ cloud: { cloudName: env.CLOUDINARY_CLOUD_NAME } });

  const [isLoading, setIsLoading] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | "">("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

    try {
      const file = e.target.files?.[0];
      if (!file) return;
      console.log('FILE', URL.createObjectURL(file));
      setFileUrl(URL.createObjectURL(file));
      setFile(file);
    } catch (error: any) {
      console.log(error);
      return toast.error(error?.message || 'Unable to upload image');
    }

  }

  const handleUpload = async () => {

    try {
      if (!file) return toast.error('No file selected');
      setIsLoading(true);
      const fileData = new FormData();
      fileData.append('file', file);
      fileData.append('upload_preset', env.CLOUDINARY_UPLOAD_PRESET);
      fileData.append('cloud_name',  env.CLOUDINARY_CLOUD_NAME);
      const response = await uploadImage(fileData);
      const data = await response.data;
      dispatch(setNewChatUploadedResumeDetail({
        publicId: data.public_id,
        imageUrl: data.secure_url,
      }));
      toast.success('Image uploaded successfully');
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.error?.message || error?.message || 'Unable to upload image');
    } finally {
      setIsLoading(false);
    }

  }

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    if (fileInputRef != null) fileInputRef?.current?.click(); // Trigger the file input
  };

  const removeImageHandler = async () => {
    setFileUrl("");
    setFile(null);
  }

  return (
    <div className='relative w-full flex flex-col justify-center items-center gap-2'>

      <div className="flex justify-start items-center gap-2">
        {/* <Input id="picture" type="file" accept="image/*" multiple={false} required disabled={isLoading} onChange={handleFileChange} className='w-[75%]' /> */}

        <Input
          ref={fileInputRef}
          id="abc"
          type="file"
          accept="image/*"
          multiple={false}
          required
          disabled={isLoading}
          onChange={handleFileChange}
          className="w-[75%] hidden"
        />

        <label htmlFor="abc">
          <Button variant="secondary" className='absolute z-10 left-0 bottom-2 w-8 h-8 flex justify-center items-center rounded-full p-2' onClick={handleButtonClick}>
            <Pencil />
          </Button>
        </label>

        <UserProfileAvatar className="w-32 h-32" imageUrl={fileUrl} />

        <Button variant="secondary" className='absolute z-10 right-0 bottom-2 w-8 h-8 flex justify-center items-center rounded-full p-2' onClick={removeImageHandler}>
          <X />
        </Button>

        {/* <Button className='w-[25%]' onClick={handleUpload} disabled={isLoading}>
          {
            isLoading ? <LoaderCircle className='animate-spin' /> : 'Upload'
          }
        </Button> */}
      </div>

    </div>
  )
}
