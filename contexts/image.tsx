"use client";

import React, {useContext, useState} from "react";

const ImageContext = React.createContext<{
	image?: File;
	setImage?: React.Dispatch<File>;
}>({});

interface ImageContextProviderProps {
	children: React.ReactNode;
}

export const ImageContextProvider = (props: ImageContextProviderProps) => {
	const {children} = props;
	const [image, setImage] = useState<File>();

	return (
		<ImageContext.Provider
			value={{
				image,
				setImage,
			}}
		>
			{children}
		</ImageContext.Provider>
	);
};

export const useImage = () => useContext(ImageContext);
