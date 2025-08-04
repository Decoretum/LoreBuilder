type stateTypeOrigins = {
    origins: {
        past: string,
        present: string,
        dreams: string,
        images: Array<string> // Filepath
        },
    }


type stateTypeAttributes = {
    attributes: {
        magic: string,
        skills: string,
        power: string,
        personality: string,
        equipment: string,
        physicalInfo: string,

        hobbies: string,
        interests: string,
        occupation: string,
        images: Array<string> // Filepath
    }
}

let initialState = {
    origins: {
        past: '',
        present: '',
        dreams: '',
        images: ['']
    },
    attributes: {
        magic: '',
        skills: '',
        power: '',
        personality: '',
        equipment: '',
        physicalInfo: '',

        hobbies: '',
        interests: '',
        occupation: '',
        images: ['']
    }
}

type stateType = stateTypeOrigins & stateTypeAttributes

export default function charReducer(
    state = initialState, 
    action: {
        type: string, 
        payload: any
        })
    {
    switch (action.type) {
        case 'char/editOrigins': {
            let payload : any = action.payload.origins;
            let { past, present, dreams, images } = payload;
            let newImageArr = state.origins.images;
            for (let i = 0; i <= images.length - 1; i++) {
                let image = images[i];
                if (!newImageArr.includes(image)) {
                    newImageArr.push(image);
                }
            }   

            return {
                ...state,
                origins: {
                    past: past,
                    present: present,
                    dreams: dreams,
                    images: newImageArr
                }
            }
        }

        case 'char/editAttributes': {
            let payload : any = action.payload.origins;
            let { 
                magic,
                skills,
                power,
                personality,
                equipment,
                physicalInfo,
        
                hobbies,
                interests,
                occupation,
                images 
            } = payload;
            let newImageArr = state.attributes.images;
            for (let i = 0; i <= images.length - 1; i++) {
                let image = images[i];
                if (!newImageArr.includes(image)) {
                    newImageArr.push(image);
                }
            }   

            return {
                ...state,
                attributes: {
                    magic: magic,
                    skills: skills,
                    power: power,
                    personality: personality,
                    equipment: equipment,
                    physicalInfo: physicalInfo,

                    hobbies: hobbies,
                    interests: interests,
                    occupation: occupation,
                    images: newImageArr
                }
            }
        }

        default: {
            return state;
        }
    }
}