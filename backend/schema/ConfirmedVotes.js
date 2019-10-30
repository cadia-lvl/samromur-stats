cube(`ConfirmedVotes`, {
  sql: `
    SELECT
      id,
      clip_id,
      max(created_at) as confirmed_at,
      COUNT(case when is_valid = '1' then 1 end) as upvotes,
      COUNT(case when is_valid = '0' then 1 end) as downvotes
    FROM
      votes
    GROUP BY
      clip_id
  `,
  measures: {
    count: {
      title: `fjöldi`,
      type: `count`
    },
/*     valid_count: {
      title: `staðfest`,
      type: `count`,
      filters: [
        { sql: `${CUBE}.upvotes >= 2 AND ${CUBE}.upvotes > ${CUBE}.downvotes` }
      ]
    },
    invalid_count: {
      title: `óstaðfest`,
      type: `count`,
      filters: [
        { sql: `${CUBE}.downvotes >= 2 AND ${CUBE}.downvotes > ${CUBE}.upvotes` }
      ]
    }, 
    invalid_recordings_ratio: {
      title: `hlutfall`,
      type: `number`,
      sql: `${invalid_count} / ${count}`,
      format: `percent`
    }*/
  },
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    date: {
      type: `time`,
      sql: `confirmed_at`
    },
    valid: {
      type: `number`,
      case: {
        when: [
          {sql: `${CUBE}.upvotes >= 2 AND ${CUBE}.upvotes > ${CUBE}.downvotes`, label: `Staðfest`},
          {sql: `${CUBE}.downvotes >= 2 AND ${CUBE}.downvotes > ${CUBE}.upvotes`, label: `Hafnað`}
        ],
        else: { label: `Óyfirfarið`}
      }
    }
  }
});