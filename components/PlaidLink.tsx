import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from "react-plaid-link";
import { useRouter } from "next/navigation";
import { createLinkToken, exchangePublicToken } from "@/lib/actions/user.actions";
import Image from "next/image";

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [linkReady, setLinkReady] = useState(false); // Track if Plaid is ready

  useEffect(() => {
    if (!token) {
      const getLinkToken = async () => {
        try {
          console.log("Fetching Plaid Link Token...");
          const data = await createLinkToken(user);
          console.log("Plaid Link Token Response:", data?.linkToken);

          if (data?.linkToken) {
            setToken(data.linkToken);
          } else {
            console.error("Error: No link_token returned from createLinkToken.");
          }
        } catch (error) {
          console.error("Failed to fetch Plaid link token:", error);
        }
      };
      getLinkToken();
    }
  }, [user, token]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      await exchangePublicToken({
        publicToken: public_token,
        user,
      });
      router.push("/");
    },
    [user, router]
  );

  // Wait until token is available before initializing usePlaidLink
  const { open, ready } = usePlaidLink(
    token
      ? { token, onSuccess }
      : { token: "", onSuccess } // Prevents errors if token is empty
  );

  useEffect(() => {
    if (ready) setLinkReady(true);
  }, [ready]);

  

  return (
    <>
      {variant === 'primary' ? (
        <Button
          onClick={() => open()}
          disabled={!ready}
          className="plaidlink-primary"
        >
          Connect bank
        </Button>
      ): variant === 'ghost' ? (
        <Button onClick={() => open()} variant="ghost" className="plaidlink-ghost">
          <Image 
            src="/icons/connect-bank.svg"
            alt="connect bank"
            width={24}
            height={24}
          />
          <p className='hiddenl text-[16px] font-semibold text-black-2 xl:block'>Connect bank</p>
        </Button>
      ): (
        <Button onClick={() => open()} className="plaidlink-default">
          <Image 
            src="/icons/connect-bank.svg"
            alt="connect bank"
            width={24}
            height={24}
          />
          <p className='text-[16px] font-semibold text-black-2'>Connect bank</p>
        </Button>
      )}
    </>
  )
}

export default PlaidLink