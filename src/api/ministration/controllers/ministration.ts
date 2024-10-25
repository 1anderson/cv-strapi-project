
import { factories } from '@strapi/strapi'
import sanitizeHtml from 'sanitize-html';


const marked = require('marked');

module.exports = factories.createCoreController('api::ministration.ministration', ({ strapi }) => ({
  async find(ctx) {
      const result = await super.find(ctx);
      result.data = result.data.map(ministration => {
          ministration.content = sanitizeHtml(marked.parse(ministration.content));
          const date = new Date(ministration.date);
          const utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
          ministration.date = utcDate.toLocaleDateString('pt-BR');
        return ministration
      });
  
      return result;
    },
    async findOne(ctx) {
      const result = await super.findOne(ctx);
      result.data.content = sanitizeHtml(marked.parse(result.data.content));
      const date = new Date(result.data.date.date);
      const utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
      result.data.date = utcDate.toLocaleDateString('pt-BR');
      return result;
    }

}))


