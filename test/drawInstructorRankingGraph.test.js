/* global describe, it */

import {groupSortInstructorRankingData} from '../src/controllers/instructorViewController/InstructorRanking/drawInstructorRankingGraph'
import assert from 'assert'

describe('grouping and sorting instructor ranking data', () => {
  it('needs to sort by UMI6', () => {
    let input = [
        {
            "instructorName": "jb",
            "PUID": "5555",
            "UMI1":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI2":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI3":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI4":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI5":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI6":{"count":{"1":0,"2":0,"3":0,"4":0,"5":5}},
        },
        {
            "instructorName": "hello kitty",
            "PUID": "2222",
            "UMI1":{"count":{"1":0,"2":0,"3":0,"4":0,"5":5}},
            "UMI2":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI3":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI4":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI5":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI6":{"count":{"1":0,"2":0,"3":0,"4":0,"5":5}},
        },
        {
            "instructorName": "hello kitty",
            "PUID": "2222",
            "UMI1":{"count":{"1":0,"2":0,"3":0,"4":0,"5":5}},
            "UMI2":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI3":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI4":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI5":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI6":{"count":{"1":0,"2":5,"3":0,"4":0,"5":0}},
        },
        {
            "instructorName": "jb",
            "PUID": "5555",
            "UMI1":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI2":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI3":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI4":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI5":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI6":{"count":{"1":0,"2":0,"3":0,"4":0,"5":5}},
        },
        {
            "instructorName": "jb",
            "PUID": "5555",
            "UMI1":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI2":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI3":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI4":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI5":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI6":{"count":{"1":0,"2":0,"3":0,"4":0,"5":5}},
        }
    ]

    let output = [
        {
            "instructorName": "jb",
            "PUID": "5555",
            "NumCoursesTaught": 3,
            "UMI1": 3,
            "UMI2": 3,
            "UMI3": 3,
            "UMI4": 3,
            "UMI5": 3,
            "UMI6": 5
        },
        {
            "instructorName": "hello kitty",
            "PUID": "2222",
            "NumCoursesTaught": 2,
            "UMI1": 5,
            "UMI2": 3,
            "UMI3": 3,
            "UMI4": 3,
            "UMI5": 3,
            "UMI6": 3.5
        }
    ]
    assert.deepEqual(groupSortInstructorRankingData(input, "UMI6"), output)
  })

  it('needs to sort by UMI1', () => {
    let input = [
        {
            "instructorName": "jb",
            "PUID": "5555",
            "UMI1":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI2":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI3":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI4":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI5":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI6":{"count":{"1":0,"2":0,"3":0,"4":0,"5":5}},
        },
        {
            "instructorName": "hello kitty",
            "PUID": "2222",
            "UMI1":{"count":{"1":0,"2":0,"3":0,"4":0,"5":5}},
            "UMI2":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI3":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI4":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI5":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI6":{"count":{"1":0,"2":0,"3":0,"4":0,"5":5}},
        },
        {
            "instructorName": "hello kitty",
            "PUID": "2222",
            "UMI1":{"count":{"1":0,"2":0,"3":0,"4":0,"5":5}},
            "UMI2":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI3":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI4":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI5":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI6":{"count":{"1":0,"2":5,"3":0,"4":0,"5":0}},
        },
        {
            "instructorName": "jb",
            "PUID": "5555",
            "UMI1":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI2":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI3":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI4":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI5":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI6":{"count":{"1":0,"2":0,"3":0,"4":0,"5":5}},
        },
        {
            "instructorName": "jb",
            "PUID": "5555",
            "UMI1":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI2":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI3":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI4":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI5":{"count":{"1":2,"2":2,"3":2,"4":2,"5":2}},
            "UMI6":{"count":{"1":0,"2":0,"3":0,"4":0,"5":5}},
        }
    ]

    let output = [
        
        {
            "instructorName": "hello kitty",
            "PUID": "2222",
            "NumCoursesTaught": 2,
            "UMI1": 5,
            "UMI2": 3,
            "UMI3": 3,
            "UMI4": 3,
            "UMI5": 3,
            "UMI6": 3.5
        } ,{
            "instructorName": "jb",
            "PUID": "5555",
            "NumCoursesTaught": 3,
            "UMI1": 3,
            "UMI2": 3,
            "UMI3": 3,
            "UMI4": 3,
            "UMI5": 3,
            "UMI6": 5
        }
    ]
    assert.deepEqual(groupSortInstructorRankingData(input,"UMI1"), output)
  })
})