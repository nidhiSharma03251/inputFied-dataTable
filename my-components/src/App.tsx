import { useState } from "react";
import { InputField } from "./components/InputField";

export default function App() {
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");

  return (
    <div className="p-8 space-y-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">InputField Demo</h1>

      <InputField
        label="Name"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        helperText="This will be visible on your profile."
        variant="outlined"
        size="md"
      />

      <InputField
        label="Password"
        placeholder="••••••••"
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
        type="password"
        passwordToggle
        variant="filled"
        size="md"
      />

      <InputField
        label="Email"
        placeholder="you@example.com"
        invalid
        errorMessage="Invalid email address"
        variant="ghost"
        size="sm"
      />

      <InputField
        label="Loading state"
        placeholder="Fetching..."
        loading
        disabled
        size="lg"
      />
    </div>
  );
}
