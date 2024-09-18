import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettingsData(){
    const{data:settingsData, error, isLoading:isGettingSetting} = useQuery({
        queryFn: getSettings,
        queryKey: ['settings']
    })
    
    return {settingsData, error, isGettingSetting}
}