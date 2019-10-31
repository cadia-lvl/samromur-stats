cube(`UserClients`, {
    sql: `
    SELECT
        client_id,
        created_at
    from user_clients
    `,
    joins: {
      Clips: {
        relationship: `hasMany`,
        sql: `${UserClients}.client_id = ${Clips}.client_id`
      },
      Votes: {
        relationship: `hasMany`,
        sql: `${UserClients}.client_id = ${Votes}.client_id`
      }
    },
    measures: {
      count: {
        title: `nýjar heimsóknir`,
        type: `count`
      },
      speakCount: {
          title: `tala notendur`,
          type: `countDistinct`,
          sql: `${Clips}.client_id`,
      },
      convertion: {
        title: `Convertion rate`,
        type: `number`,
        sql: `(${Clips.client_count} + ${Votes.client_count}) / ${UserClients.count}`,
        format: `percent`
      },
      speakConvertion: {
          title: `Tala prósenta`,
          type: `number`,
          sql: `${Clips.client_count} / ${UserClients.count}`,
          format: `percent`
      },
      listenConvertion: {
          title: `Hlusta prósenta`,
          type: `number`,
          sql: `${Votes.client_count} / ${UserClients.count}`,
          format: `percent`
      },
      both: {
        title: `Unified`,
        type: `number`,
        sql: `${Clips.client_count} + ${Votes.client_count}`,
        format: `percent`
    }
    },
    dimensions: {
      id: {
        sql: `client_id`,
        type: `number`,
        primaryKey: true
      },
      date: {
        type: `time`,
        sql: `created_at`
      }
    }
  });