import React from 'react';
import dynamic from 'next/dynamic';

interface NoSsrProps {
  children: React.ReactNode;
}

const NoSsr = (props: NoSsrProps) => <React.Fragment>{props.children}</React.Fragment>;

export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false,
});
