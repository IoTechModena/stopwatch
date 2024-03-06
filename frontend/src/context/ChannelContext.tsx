import React from "react";

interface ChannelContextType {
  selectedChannel: number | null;
  setSelectedChannel: (value: number | null) => void;
}

export const ChannelContext = React.createContext<ChannelContextType>({
  selectedChannel: null,
  setSelectedChannel: () => {},
});
