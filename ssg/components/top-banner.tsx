import {useAppContext} from "@/context/ab-test";
import {useEffect, useState} from "react";

export function TopBanner() {
    const activeTest = useAppContext();

    // TODO IMPLEMENT TYPE CHECKING
    if (activeTest['some-test'] === 'a') {
        return <div>some-test - A, banner</div>
    }


    return <div>Default Top Banner</div>
}
