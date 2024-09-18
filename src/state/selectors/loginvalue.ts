import { selector } from "recoil";
import { AllBooks, Allmembers, alluser, assignedLibraries, getgloballoginstate, issuedbookscount, issuedbooksoflibrarian, loginstate, logo, mylibraries, requestoflibrarian, requestofreader, requestsatsuperadmin, UserName, UserRole } from "../atoms/loginstate";
import allLibraries from "../../Object";

export const loginvalue  = selector({
    key: 'Myloginvalue',
    get: ({get}) =>{
        const actualvalue=get(loginstate);
        return actualvalue;

    }, 
  });


export const rolestate =selector({
    key:'Myrolestate',
    get:({get})=>{
        const currentrolestate=get(UserRole);
        return currentrolestate;
    }
});

export const namestate=selector({
    key:'Mynamestate',
    get:({get})=>{
        const currentnamestate=get(UserName);
        return currentnamestate;
    }
})

export const bookstate=selector({
    key:'Mybookstate',
    get:({get})=>{
        const currentbookstate=get((AllBooks));
        return currentbookstate;
    }
})

export const librariesstate=selector({
    key:'Mylibrarystare',
    get:({get})=>{
        const currentlibrarystate=get((mylibraries));
        return currentlibrarystate;
    }
})
//----------------------------------------
export const membersstate=selector({
    key:'LibraryMembers',
    get:({get})=>{
        const currentmemberstate=get((Allmembers));
        return currentmemberstate;
    }
})
//-----------------------------------------
export const assignedlibrarystate=selector({
    key:'AssignedLibrary',
    get:({get})=>{
        const assignedlibrarystate=get((assignedLibraries))
        return assignedlibrarystate;
    }
})

export const logoname=selector({
    key:'librarylogo',
    get:({get})=>{
        const librarylogo=get((logo))
        return librarylogo;

    }
})

export const bookscount=selector({
    key:'bookcount',
    get:({get})=>{
        const countofbooks=get((AllBooks));
        return countofbooks.length;
    }
})

export const librariescount=selector({
    key:'librariescount',
    get:({get})=>{
        const countoflibraries=get((mylibraries));
        return countoflibraries.length;
    }
})

export const memberscount=selector({
    key:'memberscount',
    get:({get})=>{
        const countofmembers=get((Allmembers));
        return countofmembers.length;
    }
})


export const myrequestofreader=selector({
    key:'readersrequest',
    get:({get})=>{
        const readerssrequest=get((requestofreader));
        return readerssrequest;

    }
})

export const allrequestofsuperadmin=selector({
    key:'superadminrequest',
    get:({get})=>{
        const superadminsssrequest=get((requestsatsuperadmin));
        return superadminsssrequest;

    }
})

export const myrequestoflibrarian=selector({
    key:'librariansrequest',
    get:({get})=>{
        const librariansrequest=get((requestoflibrarian));
        return librariansrequest;

    }
})


export const currentissuedbookscount =selector({
    key:'issuedbookscount',
    get:({get})=>{
        const currentissuedbookscount=get(issuedbookscount);
        return currentissuedbookscount;
    }
});



export const userstate=selector({
    key:'Myuserstate',
    get:({get})=>{
        const currentuserstate=get((alluser));
        return currentuserstate;
    }
})


export const getissuedbookscount=selector({
    key:'librarianissuedbookscount',
    get:({get})=>{
       const issuedcount=get((issuedbooksoflibrarian));
       return issuedcount;
    }
})

export const getloginvalue = selector<boolean | null>({
    key: 'Myloginvalue',
    get: ({ get }) => {
        const actualvalue = get(getgloballoginstate);
        return actualvalue;
    },
});