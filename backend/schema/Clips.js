cube(`Clips`, {
  sql: `
  SELECT * from clips
  `,
  joins: {
    Votes: {
      relationship: `hasMany`,
      sql: `${Clips}.id = ${Votes}.clip_id`
    }
  },
  measures: {
    count: {
      title: `fjöldi`,
      type: `count`
    },
    client_count: {
      title: `notendur`,
      type: `countDistinct`,
      sql: `client_id`
    },
    rollingCountWeek: {
      sql: `id`,
      type: `count`,
      rollingWindow: {
        trailing: `1 week`
      }
    },
    rollingCountHour: {
      sql: `id`,
      type: `count`,
      rollingWindow: {
        trailing: `1 hour`
      }
    },
    cumulativeCount: {
      type: `count`,
      rollingWindow: {
        trailing: `unbounded`
      }
    },
    ave: {
      title: `ave`,
      sql: `${rollingCountHour}`,
      type: `avg`
    }
  },
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    votes: {
      title: `votes`,
      type: `number`,
      case: {
        when: [
          {sql: `${CUBE}.is_valid = '1'`, label: `Staðfest`},
          {sql: `${CUBE}.is_valid = '0'`, label: `Hafnað`}
        ],
        else: { label: `Óyfirfarið`}
      }
    },
    sex: {
      title: `Kyn`,
      type: `string`,
      case: {
        when: [
            { sql: `${CUBE}.sex = 'karl'`, label: `Karl` },
            { sql: `${CUBE}.sex = 'kona'`, label: `Kona` },
            { sql: `${CUBE}.sex = 'annad'`, label: `Annað` },
        ],
        else: { label: `Óuppgefið kyn` }
        }
    },
    age: {
      title: `Aldur`,
      type: `string`,
      case: {
        when: [
            { sql: `${CUBE}.age = 'unglingur'`, label: `18-19` },
            { sql: `${CUBE}.age = 'tvitugt'`, label: `20-29` },
            { sql: `${CUBE}.age = 'thritugt'`, label: `30-39` },
            { sql: `${CUBE}.age = 'fertugt'`, label: `40-49` },
            { sql: `${CUBE}.age = 'fimmtugt'`, label: `50-59` },
            { sql: `${CUBE}.age = 'sextugt'`, label: `60-69` },
            { sql: `${CUBE}.age = 'sjotugt'`, label: `70-79` },
            { sql: `${CUBE}.age = 'attraett'`, label: `80-89` },
            { sql: `${CUBE}.age = 'niraett'`, label: `90+` },
        ],
        else: { label: `Óuppgefinn aldur` }
        },
    },
    date: {
      type: `time`,
      sql: `created_at`
    },
    hour: {
      type: `number`,
      sql: `HOUR(created_at)`
    }
  },
  segments: {
    karlar: { sql: `sex = 'karl'` },
    konur: { sql: `sex = 'kona'` }
  }
});