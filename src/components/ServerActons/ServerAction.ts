'use server';

import { revalidateTag as revalidate } from 'next/cache';
import { cookies } from 'next/headers';

async function revalidateTag(name: string) {
  revalidate(name);
}

export default revalidateTag;

export const token = async (): Promise<any> => {
  try {
    const Cookies = await cookies();

    const token = Cookies.get('superAdminToken');
    return token?.value;
  } catch (error) {
    throw new Error('Token not found');
  }
};
