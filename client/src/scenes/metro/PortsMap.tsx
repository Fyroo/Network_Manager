import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import PortIcon from '../../components/PortIcon';
import { tokens } from "../../theme";
import { useTheme } from "@mui/system";

const PortsMap = ({ block, parentCallback }: { parentCallback: (childData: any) => void; block: any }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [portList, setPortList] = useState<any[]>([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const checkCalledRef = useRef(false); 

    useEffect(() => {
             getPorts();
    }, [block]);

    const getPorts =  () => {
        axios.get(`http://localhost:3001/ports/${block.id}`).then((response)=>{
            setPortList(response.data);
            if (!checkCalledRef.current) { 
                check((response.data),block);
                checkCalledRef.current = true;
            }
            });


    };

    const createPort = async (key: any, i: any) => {
        await axios.post("http://localhost:3001/createport",
            { blockid: key, slot: i });
        console.log('Port Created');
    };

    async function check(props:any,block:any) {
        if (props.length === 0) {
            console.log('No Ports Found, Creating Ports..');
            for (let i = 0; i < block.length; i++) { 
                await createPort(block.id, i);
            }
            await getPorts();
            setIsDataLoaded(true);
        } else {
            await getPorts();
            setIsDataLoaded(true); 
        }
    }

    const dataPort = portList.map((data) => {
        
        return <Port
            key={data.id}
            ID={data.id}
            Address={data.address}
            AffPort={data.affport}
            Breakout={data.breakout}
            OptHead={data.opthead}
            Observ={data.observ} />
    });

    function handelShowClick(item: any) {
        parentCallback(item);
    }

    function Port(props: any) {
        return (
            <Box flexDirection={'column'}>
                <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <Button style={{ padding: '5' }} onClick={() => handelShowClick(props)}>
                        <PortIcon isActive={true} />
                    </Button>
                </Box>
                <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <Typography color={colors.primary[900]} sx={{ fontSize: { sm: 11, xs: 15 } }}>
                        {props.Address}
                    </Typography>
                </Box>
            </Box>
        );
    }

    return (
        <Box><Typography>{block.length}</Typography>
            {isDataLoaded ? (
                <Box>{dataPort}</Box>
            ) : (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <Typography>Loading Ports...</Typography>
                </Box>
            )}
        </Box>
    )
}

export default PortsMap;
