import {ConnectWallet, useContract, useContractRead, useContractWrite} from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import {ABI} from "./abi";
import {useState} from "react";


const AddressContract = "0xF70b772394A7EBd0846cfD3e9663393777e15AAf"


const Home: NextPage = () => {
  const {contract} = useContract(AddressContract, ABI)
  const {data} = useContractRead(contract, "getCandidates");

  const [address, setAddress] = useState<string>("");
  const [name, setName] = useState<string>("")

  const getName = useContractRead(contract, "getCandidateName", [address])
    const getVotesCount = useContractRead(contract, "getVotes", [address])

    const registrate = useContractWrite(contract, "registerCandidate")
    const vote = useContractWrite(contract, "vote")

  return (
      <div className={styles.container}>
          <ConnectWallet />
          <div>
              <input placeholder={"Name"} value={name} onChange={e => setName(e.target.value)} />
              <button onClick={() => {
                registrate.mutate({args : [name]})
              }}>
                Registrate
              </button>
          </div>
        <div style={{margin : "20px 0"}}>
          {data?.map((address : string) => {
            return <p key={address}>{address}</p>
          })}
        </div>
        <div>
            <input value={address} onChange={e => setAddress(e.target.value)} />
            <button onClick={() => getName.refetch()}>Get Name</button>
            <button onClick={() => getVotesCount.refetch()}>Get votes count</button>
            <button onClick={() => vote.mutate({args : [address]})}>Vote</button>
        </div>
          <p>Name : {getName.data ? getName.data : ""}</p>
          <p>Votes count : {getVotesCount.data ? parseInt(getVotesCount.data, 16) : ""}</p>
      </div>
  );
};

export default Home;
