
import React from 'react'
import { CircularProgress } from '@mui/material';
import { useAppSelector } from '@/app/hooks';
import { selectLoading } from '@/store/app/appSlice';

const PageLoading: React.FC = (): JSX.Element => {
  const loading = useAppSelector(selectLoading);
  return (
    <>
      {loading &&
        <div className="full-loading">
          <CircularProgress sx={{ position: 'fixed', top: 'calc(50% - 20px)', right: 'calc(50% - 20px)' }} />
        </div>
      }
    </>
  )
}

export default PageLoading