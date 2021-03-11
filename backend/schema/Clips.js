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
      type: `count`,
      description: `recordings`
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
        trailing: `unbounded`
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
    averageClipsPerClient: {
      title: `Average clips per client`,
      type: `number`,
      sql: `${Clips.count} / ${Clips.client_count}`,
      format: `percent`
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
          {sql: `${CUBE}.is_valid = '1'`, label: `Validated`},
          {sql: `${CUBE}.is_valid = '0'`, label: `Invalidated`}
        ],
        else: { label: `Unconfirmed`}
      }
    },
    sex: {
      title: `Kyn`,
      type: `string`,
      case: {
        when: [
            { sql: `${CUBE}.sex = 'karl'`, label: `Male` },
            { sql: `${CUBE}.sex = 'kona'`, label: `Female` },
            { sql: `${CUBE}.sex = 'annad'`, label: `Other` },
        ],
        else: { label: `Undefined` }
        }
    },
    age: {
      title: `Aldur`,
      type: `string`,
      case: {
        when: [
            { sql: `${CUBE}.age < 13 and ${CUBE}.age > 0`, label: `0-12` },
            { sql: `${CUBE}.age < 18 and ${CUBE}.age > 12`, label: `13-19` },
            { sql: `${CUBE}.age = 'ungur_unglingur'`, label: `13-19` },
            { sql: `${CUBE}.age = 'unglingur'`, label: `13-19` },
            { sql: `${CUBE}.age = 'tvitugt'`, label: `20-29` },
            { sql: `${CUBE}.age = 'thritugt'`, label: `30-39` },
            { sql: `${CUBE}.age = 'fertugt'`, label: `40-49` },
            { sql: `${CUBE}.age = 'fimmtugt'`, label: `50-59` },
            { sql: `${CUBE}.age = 'sextugt'`, label: `60-69` },
            { sql: `${CUBE}.age = 'sjotugt'`, label: `70-79` },
            { sql: `${CUBE}.age = 'attraett'`, label: `80-89` },
            { sql: `${CUBE}.age = 'niraett'`, label: `90+` },
        ],
        else: { label: `Undefined` }
        },
    },
    native: {
      title: `Móðurmál`,
      type: `string`,
      case: {
        when: [
            { sql: `${CUBE}.native_language = 'islenska'`, label: `Icelandic` },
        ],
        else: { label: `Other` }
        },
    },
    date: {
      type: `time`,
      sql: `created_at`
    },
    hour: {
      type: `string`,
      sql: `HOUR(created_at)`
    }
  },
  segments: {
    karlar: { sql: `sex = 'karl'` },
    konur: { sql: `sex = 'kona'` }
  }
});