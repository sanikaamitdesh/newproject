import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server"; 

export async function PUT(request, { params }) {
    const { id } = params;

    const { newTitle: title, newDescription: description } = await request.json();

    
    await connectMongoDB();

    try {
      
        const updatedTopic = await Topic.findByIdAndUpdate(id, { title, description }, { new: true });

      
        if (!updatedTopic) {
            return NextResponse.json({ message: "Topic not found" }, { status: 404 });
        }

       
        return NextResponse.json({ message: "Topic Updated", topic: updatedTopic }, { status: 200 });
    } catch (error) {
    
        console.error("Error updating topic:", error);
        return NextResponse.json({ message: "Error updating topic", error: error.message }, { status: 500 });
    }
}
export async function GET(request,{params}){
    const {id}=params;
    await connectMongoDB();
    const topic=await Topic.findOne({_id:id})
    return NextResponse.json({topic},{status:201})

}