import React from "react";

interface ChannelContextType {
  selectedChannel: number | null;
  setSelectedChannel: (value: number) => void;
}

export const ChannelContext = React.createContext<ChannelContextType>({
  selectedChannel: null,
  setSelectedChannel: () => {},
});
