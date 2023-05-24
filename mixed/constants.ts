type BranchName = 'a' | 'b' | 'c' | 'd';

export type TestVariant = {
    id: string;
    branch: BranchName;
    weight: number;
}

export interface Test {
    testID: string;
    URLs: string[];
    UTMs: string[];
    locales: string[];
    countries: string[];
    os: string[];
    segment: {
        from: number;
        to: number;
    };
    variants: TestVariant[];
    scenario?: string;
}

export const mockedResponse: Record<string, Test> = {
    malware: {
        testID: '1',
        segment: {
            from: 0,
            to: 25
        },
        variants: [
            {
                branch: 'a', id: '11',
                weight: 50

            },
            {
                branch: 'b',
                id: '12',
                weight: 50
            }
        ],
        // ALL of these are some kind of filtration, so I implemented part of them
        // because we can add any kind of filtration
        URLs: [],
        UTMs: [],
        locales: ['fr'],
        countries: [],
        // TODO DEMO - switch
        os: ['mobile']
    },
    'sunset-cmm': {
        testID: '2',
        segment: {
            from: 0,
            to: 50
        },
        variants: [{
            branch: 'a',
            id: '21',
            weight: 33
        }, {
            branch: 'b',
            id: '22',
            weight: 33
        }, {
            branch: "c",
            id: '23',
            weight: 33
        }],
        URLs: ['/first-article'],
        UTMs: [],
        locales: [],
        countries: [],
        os: ['desktop']
    },
    'some-test': {
        testID: '3',
        segment: {
            from: 50,
            to: 100
        },
        variants: [
            {
                branch: 'a',
                id: '31',
                weight: 50

            }, {
                branch: 'b',
                id: '32',
                weight: 50
            }
        ],
        URLs: ['/'],
        UTMs: [],
        locales: [],
        countries: [],
        os: ['mobile'],
        // scenario: 'cmm-download'
    }
}
