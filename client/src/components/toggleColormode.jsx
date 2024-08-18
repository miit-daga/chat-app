import { Button, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const ToggleColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const iconColor = useColorModeValue("black", "white");

  return (
    <Button
      onClick={() => toggleColorMode()}
      pos="absolute"
      top="0"
      right="0"
      m="1rem"
      backgroundColor={bgColor}
      color={iconColor}
      _hover={{ backgroundColor: useColorModeValue("gray.200", "gray.600") }}
    >
      {colorMode === "dark" ? (
        <SunIcon color="orange.400" />
      ) : (
        <MoonIcon color="blue.700" />
      )}
    </Button>
  );
};

export default ToggleColorMode;
