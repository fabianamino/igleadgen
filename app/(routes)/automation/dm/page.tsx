import { getCurrentUser } from '@/actions/user';
import React from 'react';
type Props = {
}
const page = async (props: Props) =>{
    const user = await getCurrentUser();
    return <div>Page  </div>
}