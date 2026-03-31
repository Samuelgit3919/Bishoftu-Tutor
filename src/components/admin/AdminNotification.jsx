import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from 'sonner';

export default function AdminNotifications() {
    const [notifications, setNotifications] = useState([]);
    // const { toast } = useToast(); removed for sonner

    useEffect(() => {
        const unsub1 = base44.entities.TutorRequest.subscribe((event) => {
            if (event.type === 'create') {
                const n = {
                    id: Date.now(),
                    type: 'request',
                    message: `New tutor request from ${event.data.full_name}`,
                    time: new Date().toLocaleTimeString(),
                };
                setNotifications(prev => [n, ...prev].slice(0, 20));
                toast({
                    title: '📋 New Tutor Request',
                    description: `${event.data.full_name} needs a ${event.data.subject} tutor`,
                });
            }
        });

        const unsub2 = base44.entities.TutorApplication.subscribe((event) => {
            if (event.type === 'create') {
                const n = {
                    id: Date.now(),
                    type: 'application',
                    message: `New tutor application from ${event.data.full_name}`,
                    time: new Date().toLocaleTimeString(),
                };
                setNotifications(prev => [n, ...prev].slice(0, 20));
                toast({
                    title: '👨‍🏫 New Tutor Application',
                    description: `${event.data.full_name} wants to become a tutor`,
                });
            }
        });

        return () => { unsub1(); unsub2(); };
    }, []);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-muted-foreground">
                    <Bell className="w-4 h-4" />
                    {notifications.length > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                            {notifications.length}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0">
                <div className="p-3 border-b border-border">
                    <h4 className="font-semibold text-sm">Notifications</h4>
                </div>
                <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                        <div className="p-6 text-center text-sm text-muted-foreground">
                            No new notifications
                        </div>
                    ) : (
                        notifications.map(n => (
                            <div key={n.id} className="px-3 py-2.5 border-b border-border/50 hover:bg-muted/50">
                                <p className="text-sm text-foreground">{n.message}</p>
                                <p className="text-[10px] text-muted-foreground mt-0.5">{n.time}</p>
                            </div>
                        ))
                    )}
                </div>
                {notifications.length > 0 && (
                    <div className="p-2 border-t border-border">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full text-xs"
                            onClick={() => setNotifications([])}
                        >
                            Clear All
                        </Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
}