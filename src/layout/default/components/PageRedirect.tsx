
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { setRedirect, selectRedirect } from '@/store/app/appSlice';

const PageRedirect: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const redirect = useAppSelector(selectRedirect);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (redirect.path) {
      dispatch(setRedirect({}))
      navigate(redirect.path, { replace: redirect.replace })
    }
  }, [redirect.path])

  return (<> </>)
}

export default PageRedirect