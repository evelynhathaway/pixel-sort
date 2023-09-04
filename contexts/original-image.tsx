"use client";

import React, {useContext, useState} from "react";

const OriginalImageContext = React.createContext<{
	originalImage?: File;
	setOriginalImage?: React.Dispatch<File>;
}>({});

interface OriginalImageContextProviderProps {
	children: React.ReactNode;
}

export const OriginalImageContextProvider = (props: OriginalImageContextProviderProps) => {
	const {children} = props;
	const [originalImage, setOriginalImage] = useState<File>();

	return (
		<OriginalImageContext.Provider
			value={{
				originalImage,
				setOriginalImage,
			}}
		>
			{children}
		</OriginalImageContext.Provider>
	);
};

export const useOriginalImage = () => useContext(OriginalImageContext);
