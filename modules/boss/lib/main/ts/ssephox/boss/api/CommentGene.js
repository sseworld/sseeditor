import { Gene } from './Gene';
export const CommentGene = (id, text) => {
    return Gene(id, "COMMENT_GENE" /* GeneTypes.Comment */, [], {}, {}, text);
};
//# sourceMappingURL=CommentGene.js.map