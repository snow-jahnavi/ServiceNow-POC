(function process( /*ResolverEnvironment*/ env) {
    try {
        var ACHIEVEMENT_FIELDS = 'sys_id,name,description,achievement_type,badge,points,active,sys_created_on,sys_updated_on';

        var source = env.getSource();
        var achievementSysId = source.achievement;

        if (!achievementSysId) {
            return null;
        }

        var learningAPI = new sn_lxp.LearningAPI({ queryParams: {}}, {}, 1);
        var encodedQuery = 'sys_id=' + achievementSysId;
        var results = learningAPI.getGlideRecordSecureSetData('sn_lxp_achievement', encodedQuery, ACHIEVEMENT_FIELDS);

        if (results && results.items.length > 0) {
            var rec = results.items[0];
            return {
                sys_id: rec.sys_id || '',
                name: rec.name || '',
                description: rec.description || '',
                achievement_type: rec.achievement_type || '',
                badge: rec.badge || '',
                points: parseInt(rec.points || '0', 10),
                active: rec.active === 'true',
                sys_created_on: rec.sys_created_on || '',
                sys_updated_on: rec.sys_updated_on || '',
            };
        }

        return null;
    } catch (e) {
        gs.error('[LXP GraphQL] resolveUserAchievementAchievement: ' + e.message);
        throw e;
    }
})(env);
