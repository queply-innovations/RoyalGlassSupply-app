import { UseModalProps } from "@/utils/Modal";
import { useState } from "react";

interface AddProductProps {
    onClose: UseModalProps["closeModal"];
}

export const AddProduct = ({ onClose }: AddProductProps) => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    return (
        <>Hello!</>
    )
}
