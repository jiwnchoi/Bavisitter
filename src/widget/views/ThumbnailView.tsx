import { Box, Flex, Image } from "@chakra-ui/react";
import { useChartStore } from "@stores";
import { useMessages } from "@hooks";

interface ThumbnailViewProps {
  width?: string;
  height?: string;
}

const ThumbnailView = (props: ThumbnailViewProps) => {
  const charts = useChartStore((state) => state.charts);
  const { scrollIntoChat } = useMessages();

  return (
  	<Box overflowX="auto" overflowY="hidden" 
	  width={props.width} height={props.height} 
	  marginTop="15px">
	  <Flex justifyContent="center">
      {charts.map((chart, index) => (
        <Image
          key={index}
          src={chart.thumbnail}
          height={props.height}
          paddingLeft={charts.length>=5 ? 
						(index===0 ? 
			  			  `${(1 - (charts.length % 2)) * 90 + 48}px` 
			  			:"0")
					  :"0"}
          onClick={() => chart && scrollIntoChat(chart.chatIndex)}
          cursor="pointer"
          _hover={{ opacity: 0.5 }}
        />
        ))}
      </Flex>
    </Box>
  );
};

export default ThumbnailView;
