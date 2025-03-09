"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-fit" type="submit" disabled={pending}>
      Submit
    </Button>
  );
}
