import { Cloudinary } from '@cloudinary/url-gen';
import { useState } from 'react';
import { env } from '../../config/env';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { uploadImage } from '@/services/cloudinary';
import { LoaderCircle } from 'lucide-react';
import { setNewChatUploadedResumeDetail } from '@/lib/store/features/conversation/consersationSlice';
import { useAppDispatch } from '@/lib/store/hooks/hooks';

export const UploadCloudinary = () => {

  const dispatch = useAppDispatch();

  const myCld = new Cloudinary({ cloud: { cloudName: env.CLOUDINARY_CLOUD_NAME } });

  const [isLoading, setIsLoading] = useState(false);

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

    try {
      const file = e.target.files?.[0];
      if (!file) return;
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

  return (
    <div className='w-full flex flex-col justify-center items-center gap-2'>

      <div className="flex w-[30rem] justify-center items-center gap-2">
        <Input id="picture" type="file" accept="image/*" multiple={false} required disabled={isLoading} onChange={handleFileChange} className='w-[75%]' />
        {/* can provide text while uploading to make waiting more user friendly */}
        <Button className='w-[25%]' onClick={handleUpload} disabled={isLoading}>
          {
            isLoading ? <LoaderCircle className='animate-spin' /> : 'Upload'
          }
        </Button>
      </div>

    </div>
  )
}
