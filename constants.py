from enum import Enum

class SERVICE_STATE:
    REJECTED = 0
    PENDING = 1
    ACCEPTED = 2
    ONGOING = 3
    COMPLETED = 4

    GET_STRING = ['rejected', 'pending', 'accepted', 'ongoing', 'completed']

    # {
    #     "dates":{"accepted":None,"completed":None,"requested":"06/25/2023"},
    #     "service":{"date":"January 2020","name":"Attendance Record","type":"Daily Time Record"},
    #     "state":1,
    #     "user":{"contact":"09194691080","email":"bindfact@gmail.com","name":"Bind Fact"}
    # }
