import { ResponsiveNetwork } from '@nivo/network'
import { useTheme } from '@mui/material'
import { tokens } from '../../theme'
import { mockDataNodes as data } from '../../data/mockData'
const NetworkChart = ()=>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    return(
        <ResponsiveNetwork
        data={data}
        theme={{
            axis: {
                domain:{
                    line:{
                        stroke: colors.grey[100]
                    },
                },
                legend: {
                    text:{
                        fill: colors.grey[100]
                    }
                },
                ticks:{
                    line:{
                        stroke: colors.grey[100],
                        strokeWidth: 1
                    },
                    text:{
                        fill: colors.grey[100]
                    } 
                }
            },
            tooltip:{
                container:{
                    background:colors.primary[900],
                    color:colors.primary[100]
                    
                }
            }
    
        }}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        linkDistance={function(e){return e.distance}}
        centeringStrength={4.1}
        repulsivity={1}
        iterations={100}
        nodeSize={function(n){return n.size}}
        activeNodeSize={22}
        nodeColor={function(e){return e.color}}
        nodeBorderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.8
                ]
            ]
        }}
        linkThickness={function(n){return 2+2*n.target.data.height}}
        linkBlendMode="multiply"
        motionConfig="default"
    />
    )
}
export default NetworkChart