import Comment from '../model/comment.js';

export const newComment = async (request, response) => {
    try {
        const { name, postId, comments } = request.body;
        if (!name || !postId || !comments) {
            return response.status(400).json({ error: "Missing required fields" });
        }
        const comment = new Comment(request.body);
        await comment.save();
        response.status(200).json('Comment saved successfully');
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}


export const getComments = async (request, response) => {
    try {
        const comments = await Comment.find({ postId: request.params.id });
        
        response.status(200).json(comments);
    } catch (error) {
        response.status(500).json(error)
    }
}

export const deleteComment = async (request, response) => {
    const { id } = request.params;
    if (!id) {
        return response.status(400).json({ message: "Comment ID is required" });
    }
    try {
        const comment = await Comment.findById(id);
        if (!comment) {
            return response.status(404).json({ message: "Comment not found" });
        }
        await comment.deleteOne();
        response.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error('Error deleting comment:', error);
        response.status(500).json({ message: "Failed to delete comment", error });
    }
}