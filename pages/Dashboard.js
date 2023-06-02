
import DesktopNav from '@/components/DesktopNav';
import { Flex, Stack, useMediaQuery } from '@chakra-ui/react';
import React from 'react';


const Dashboard = () => {
    const [isLargerThan768] = useMediaQuery('(min-width: 768px)')
    return (
        <>
            {isLargerThan768 ? <DesktopNav></DesktopNav> : <></>}
        </>
    );
};

export default Dashboard;