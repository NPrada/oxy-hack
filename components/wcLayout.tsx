// components/Layout.js

import Navbar from "./core/Navbar";

import type { AppProps } from "next/app";
import { ChakraProvider, Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import Footer from "./core/Footer";

export const WCLayout = ({ children }: { children: any }) => {
  return (
    <Grid
      templateAreas={`"header" "main" "footer"`}
      w="100%"
      width="100%"
      gridTemplateRows={"100px 3f 40px "}
      gridTemplateColumns={"1fr"}
      paddingY="2em"
    >
      <GridItem area={"header"} padding={4}>
        <Navbar />
      </GridItem>
      <GridItem area={"main"} padding={10}>
        <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {children}
        </Flex>
      </GridItem>
      <GridItem area={"footer"}>
        <Footer />
      </GridItem>
    </Grid>
  );
};

export default Layout;
