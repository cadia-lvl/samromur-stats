cube(`Votes`, {
  sql: `
    SELECT
      id,
      client_id,
      clip_id,
      created_at,
      ifnull(case when is_valid = '1' then 1 end, 0) as upvotes,
      ifnull(case when is_valid = '0' then 1 end, 0) as downvotes
    FROM
      votes
  `,
  joins: {
    Votes: {
      relationship: `hasMany`,
      sql: `${Votes}.clip_id = ${Clips}.id`
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
    }
  },
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    date: {
      type: `time`,
      sql: `created_at`
    }
  }
});