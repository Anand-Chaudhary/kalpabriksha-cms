import { Request, Response } from "express";
import supabase from "../db/dbConnect";

export const UploadImage = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    const { event } = req.body;

    if (!file || !event) {
      return res.status(400).json({
        success: false,
        message: "image and event are required",
      });
    }

    const fileExt = file.originalname.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;

    const filePath = `${event}/${fileName}`;

    // upload to supabase storage
    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
      });

    if (uploadError) {
      return res.status(400).json({
        success: false,
        message: uploadError.message,
      });
    }

    // public url
    const { data } = supabase.storage
      .from("gallery")
      .getPublicUrl(filePath);

    const imageUrl = data.publicUrl;

    // save in DB
    const { data: inserted, error } = await supabase
      .from("gallery_images")
      .insert({
        image_url: imageUrl,
        event,
      })
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      data: inserted,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const GetImages = async (req: Request, res: Response) => {
  try {
    const event = req.query.event as string | undefined;

    let query = supabase
      .from("gallery_images")
      .select("*")
      .order("created_at", { ascending: false });

    if (event) {
      query = query.eq("event", event);
    }

    const { data, error } = await query;

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};